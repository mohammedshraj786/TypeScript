import React from "react";
import Header from "./header";
import { screen , render } from "@testing-library/react";

test("Rendering the header component",()=>
{

render(<Header/>);

const HeaderElementFound = screen.getByText((content) =>
 {
    const normalizedText = content.trim();
    return normalizedText === 'ToDo-List';
  });

if(HeaderElementFound)
{
    console.log("Header is founded");
    
    expect(HeaderElementFound).toBeInTheDocument();
}
else{
    console.log("Header Element Is Not Found");
    
}


});
