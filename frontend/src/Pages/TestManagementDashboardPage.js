import React from 'react'
import Dashboard from '../Components/Dashboard'


const TestManagementPage = () => {
  const subTestData = {
    compName: 'Tests',
    urlEnd : 'group_sub_test',
  }
  const TestCategoryData = {
    compName: 'Focused Tests',
    urlEnd : 'group_test_categories',
  }
  const TestCombinedCategoryData = {
    compName: 'Comprehensive Tests',
    urlEnd : 'group_test_combined_categories',
  }
  return (
    <>
    <div>TestManagementPage</div>
    <Dashboard data = {subTestData}/>
    <Dashboard data = {TestCategoryData} />
    <Dashboard data = {TestCombinedCategoryData} />
    </>

  )
}

export default TestManagementPage 