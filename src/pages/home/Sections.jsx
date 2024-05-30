import React from "react";
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

function Sections({ name }) {
  return (
    <div>
      {name !== "이민성" && <Section1 />}
      {name === "이민성" && <Section3 />}
      <Section2 />
    </div>
  );
}

export default Sections;
