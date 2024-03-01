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
    <div className='flex flex-col container min-h-screen '>
      <TestSessionData endpoints={endpoints.subTestEndpoint} type = "Sub Tests" />
      <TestSessionData endpoints={endpoints.focusedTestEndpoint} type = "Focused Tests"/>
      <TestSessionData endpoints={endpoints.comprehensiveTestEndpoint} type = "Comprehensive  Tests"/>
    </div>
  )
}

export default CollegeSessionAnalyticalDashboard