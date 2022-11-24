// import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { AbsencesData } from '../Redux/Actions/absencesAction'
import { MembersData } from '../Redux/Actions/membersAction'
import { Table,Thead,Td,Th,TableResponsive} from '../styles/Styles';

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
      <TableResponsive>
      <Table className="table">
        <Thead>
          <tr>
            <Th colSpan="col">Member Name</Th>
            <Th colSpan="col">Types Of Absences</Th>
            <Th colSpan="col">Period</Th>
            <Th colSpan="col">Member Note</Th>
            <Th colSpan="col">Status</Th>
            <Th colSpan="col">Admitter Note</Th>
          </tr>
        </Thead>
        {handleFilterData(absences)?.slice(pagesVisited, pagesVisited + usersPerPage).
          map((absence, index) => (
            <tbody key={index}>
              <tr>
                <Td>{getNameByUserId(absence.userId)[0]?.name}</Td>
                <Td colSpan="col">{absence.type}</Td>
                <Td>{moment(moment(absence.endDate).format('DD/MMM/YYYY')).diff(moment(absence.startDate).format('DD/MMM/YYYY'), 'days')}</Td>
                <Td>{absence?.memberNote ? absence?.memberNote : "-"}</Td>
                <Td>{absence.confirmedAt ?  "Confirm" : absence.rejectedAt ? "Rejected" : "Requested" }</Td>
                <Td>{absence.admitterNote ? absence.admitterNote : "-"}</Td>
              </tr>
            </tbody>
          ))}
      </Table>
      </TableResponsive>
      <Pagination pageCount={pageCount} handleChangePage={handleChangePage} />
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