import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AbsencesData } from "../Redux/Actions/absencesAction";
import { MembersData } from "../Redux/Actions/membersAction";
import {
  Table,
  Thead,
  Td,
  Th,
  TableResponsive,
  Button,
  H3
} from "../styles/Styles";

const Absences = () => {
  const dispatch = useDispatch();
  const absences = useSelector((state) => state.absence.data);
  const members = useSelector((state) => state.member.data);
  
  const [filter, setFilter] = useState("none");
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalAbsences, setTotalAbsences] = useState(0)

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    dispatch(AbsencesData());
    dispatch(MembersData());
  }, []);
  const getNameByUserId = (id) => {
    return members.filter((member) => {
      if (member.userId == id) {
        return member.name;
      }
    });
  };
  const pageCount = Math.ceil(
    isNaN(absences?.length / usersPerPage) ? 0 : absences?.length / usersPerPage
  );

  const handleChangePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const FilterData = useMemo(() => {
    if (filter === "date") {
      return absences?.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
    } else if (filter === "type") {
      return absences?.sort((a, b) => a.type.localeCompare(b.type));
    } else {
      return absences;
    }
  }, [filter, absences]);

  useEffect(()=>{
    const data = absences?.filter((absence)=>absence.confirmedAt);
    setTotalAbsences(data?.length);
  },[absences])
  const saveCalInvite = (absence) => {
    // Create the .ics URL
    let url = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:" + absence.startDate,
      "DTEND:" + absence.endDate,
      "SUMMARY:",
      "DESCRIPTION:" + absence.memberNote,
      "LOCATION:",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "REPEAT:1",
      "DURATION:PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    let blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

    if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
      // Open/Save link in IE and Edge
      window.navigator.msSaveBlob(blob, "download.ics");
    } else {
      // Open/Save link in Modern Browsers
      window.open(encodeURI("data:text/calendar;charset=utf8," + url));
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <div>
            <H3 data-testid="total-absence">Total Absences : {totalAbsences}</H3>
          </div>
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
                  <Th colSpan="col">ICal Export</Th>
                </tr>
              </Thead>
              {FilterData?.slice(pagesVisited, pagesVisited + usersPerPage).map(
                (absence, index) => (
                  <>
                    <tbody key={index}>
                      <tr>
                        <Td>{getNameByUserId(absence.userId)[0]?.name}</Td>
                        <Td colSpan="col">{absence.type}</Td>
                        <Td>
                          {!moment(
                            moment(absence.endDate).format("DD/MMM/YYYY")
                          ).diff(
                            moment(absence.startDate).format("DD/MMM/YYYY"),
                            "days"
                          ) ? 1 : moment(
                            moment(absence.endDate).format("DD/MMM/YYYY")
                          ).diff(
                            moment(absence.startDate).format("DD/MMM/YYYY"),
                            "days"
                          )}
                        </Td>
                        <Td>
                          {absence?.memberNote ? absence?.memberNote : "-"}
                        </Td>
                        <Td>
                          {absence.confirmedAt
                            ? "Confirm"
                            : absence.rejectedAt
                            ? "Rejected"
                            : "Requested"}
                        </Td>
                        <Td>
                          {absence.admitterNote ? absence.admitterNote : "-"}
                        </Td>
                        <Td onClick={() => saveCalInvite(absence)}>
                          {absence.confirmedAt ? (
                            <Button confirm={true}>Export File</Button>
                          ) : null}
                        </Td>
                      </tr>
                    </tbody>
                  </>
                )
              )}
            </Table>
          </TableResponsive>
          <Pagination
            pageCount={pageCount}
            handleChangePage={handleChangePage}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
};

export default Absences;
