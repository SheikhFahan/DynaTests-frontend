import React from 'react'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const TabsComp = ({graphCategories, handleTabSelect}) => {
  return (
<Tabs 
        onSelect={handleTabSelect}

        defaultActiveKey={null}
        id="fill-tab-example"
        className="mb-3 text-lg text-slate-950 lowercase"
        fill
      >
        {graphCategories.map((category) => (
          <Tab
            eventKey={category.pk}
            title={category.category_name}
            key={category.pk}
            className = ""
            onSelect={() => handleTabSelect(category.pk)}
          >
            {selectedCategory && graphData && <GraphComp data={graphData} />}
          </Tab>
        ))}
      </Tabs>
  )
}

export default TabsComp