import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import StudentInfo from "../Components/StudentInfo";
import InstitutionInfo from "../Components/InstitutionInfo";
import StudentPerformance from "../Components/StudentPerformance";
import InstituteTestSummary from "../Components/InstituteTestSummary";
import RadarChartComp from '../Components/RadarChartComp'

const ProfileCard = () => {
  const baseURL = "http://127.0.0.1:8000/api/user/";
  let [profileData, setProfileData] = useState([]);

  const { user, AuthTokens } = useContext(AuthContext);

  const getEndpoint = (group) => {
    switch (group) {
      case "institute":
        return {
          endpoint: "profile_institute/",
        };
      case "student":
        return {
          endpoint: "profile_student/",
        };
      default:
        throw new Error(`Unexpected value for name: ${group}`);
    }
  };
  const { endpoint } = getEndpoint(user.group);

  useEffect(() => {
    axios
      .get(`${baseURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => setProfileData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
      <div className="flex flex-row w-full h-full">

        {(user.group === "student" || user.group === "None") && (
          <>
            <div className="min-w-120">
            <StudentInfo {...profileData} />
            </div>
            <div className="w-3/4">
            <StudentPerformance />
            </div>
          </>
        )}
        {(user.group === "institute" || user.group === "None") && (
          <>
          <InstitutionInfo {...profileData} />
          <InstituteTestSummary />
          </>
        )}
      </div>
  );
};

export default ProfileCard;
