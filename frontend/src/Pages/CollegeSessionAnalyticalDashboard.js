import React from 'react'
import TestSessionData from '../Components/TestSessionData';

const CollegeSessionAnalyticalDashboard = () => {
  const endpoints = {
    subTestEndpoint: {
      endpoint1: "api/group_tests/subtest_session_list/",
      endpoint2: "api/group_tests/subtest_session_data/",
    },
    focusedTestEndpoint: {
      endpoint1: "api/group_tests/category_session_list/",
      endpoint2: "api/group_tests/category_session_data/",
    },
    comprehensiveTestEndpoint: {
      endpoint1: "api/group_tests/cc_session__list/",
      endpoint2: "api/group_tests/cc_session_data/",
    },
  };
  return (
    <div className='flex flex-col container '>
      <TestSessionData endpoints={endpoints.subTestEndpoint} />
      <TestSessionData endpoints={endpoints.focusedTestEndpoint} />
      <TestSessionData endpoints={endpoints.comprehensiveTestEndpoint} />

    </div>
  )
}

export default CollegeSessionAnalyticalDashboard