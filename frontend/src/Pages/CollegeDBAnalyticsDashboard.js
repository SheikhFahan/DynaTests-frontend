import React, { useState } from "react";

import InstDBData from "../Components/InstDBData";
import SubtestData from "../Components/SubtestData";
import FocusedTestData from "../Components/FocusedTestData";
import ComprehensiveTestData from "../Components/ComprehensiveTestData";

const CollegeDBAnalyticsDashboard = () => {

  const endpoints = {
    subTestEndpoint: {
      endpoint1: "api/group_tests/subtest_data/",
      endpoint2: "api/group_tests/subtest_detailed_data/",
    },
    focusedTestEndpoint: {
      endpoint1: "api/group_tests/category_test_data/",
      endpoint2: "api/group_tests/category_test_detailed_data",
    },
    ComprehensiveTestEndpoint: {
      endpoint1: "api/group_tests/comprehensive_test_data",
      endpoint2: "",
    },
  };
  return (
      <div className="flex flex-col p4">
        <SubtestData endpoint={endpoints.subTestEndpoint} />
        <FocusedTestData endpoint={ endpoints.focusedTestEndpoint} />
        <ComprehensiveTestData endpoint={ endpoints.ComprehensiveTestEndpoint} />
      </div>
  );
};

export default CollegeDBAnalyticsDashboard;
