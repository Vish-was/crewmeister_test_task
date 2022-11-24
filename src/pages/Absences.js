// import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import { tableHeader } from '../json/tableData';
import { useDispatch, useSelector } from 'react-redux'
import { AbsencesData } from '../Redux/Actions/absencesAction'
import { MembersData } from '../Redux/Actions/membersAction'

const Absences = () => {
  const dispatch = useDispatch();
  const absences = useSelector(state=>state.absence.data)
  const members = useSelector(state=>state.member.data)

  const [filter, setFilter] = useState('')
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false)

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  
  
  useEffect(() => {
    setLoading(false)
    setLoading(true)
    dispatch(AbsencesData())
    dispatch(MembersData())
  }, [])
  const getNameByUserId = (id) => {
    return members.filter((member) => {
      if (member.userId == id) {

        return member.name
      }
    })
  }
  const pageCount = Math.ceil(absences.length / usersPerPage);

  const handleChangePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const handleFilterData = (absencesdata) => {
    if (filter === 'date') {
      return absencesdata?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
   else if (filter === 'type') {
      return absencesdata?.sort((a, b) => a.type.localeCompare(b.type));
    }
    else{
      return absencesdata
    }
  }
  console.log(absences.filter((data)=>data));
  return (<>
    {loading ? <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th key={index} colSpan="col">{header.label}</th>
            ))}
          </tr>
        </thead>
        {handleFilterData(absences)?.slice(pagesVisited, pagesVisited + usersPerPage).
          map((absence, index) => (
            <tbody key={index}>
              <tr>
                <td>{getNameByUserId(absence.userId)[0]?.name}</td>
                <td>{absence.type}</td>
                <td>{moment(moment(absence.endDate).format('DD/MMM/YYYY')).diff(moment(absence.startDate).format('DD/MMM/YYYY'), 'days')}</td>
                <td>{absence?.memberNote ? absence?.memberNote : "-"}</td>
                <td>{absence.confirmedAt ?  "Confirm" : absence.rejectedAt ? "Rejected" : "Requested" }</td>
                <td>{absence.admitterNote ? absence.admitterNote : "-"}</td>
              </tr>
            </tbody>
          ))}
        <Pagination pageCount={pageCount} handleChangePage={handleChangePage} />
      </table>
    </div> : (<>
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
        </div>
      </div>
    </>)}
  </>
  )
}

export default Absences