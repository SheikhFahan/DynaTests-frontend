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
    <div className='container  text-lg py-20 mb-20 '>
    <Dashboard data = {subTestData}/>
    <Dashboard data = {TestCategoryData} />
    <Dashboard data = {TestCombinedCategoryData} />
    </div>

  )
}

export default TestManagementPage 