import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import NoteCard from "./card";

describe("NoteCard Component", () => {
    it("renders the NoteCard component", () => {
      const { container, getByText } = render(<NoteCard _id={""} taskData={""} color={""} stickynotes={""} onAddNote={function (stickynotes: string): void {
          throw new Error("Function not implemented.");
      } } onDeleteTask={function (): void {
          throw new Error("Function not implemented.");
      } } isDataFetching={false} />);
  
      // Check if the component is rendered
      expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  
      // Check for the presence of elements you expect in the component
    //   expect(getByText("stickynote")).toBeInTheDocument();
      expect(getByText("Add Notes")).toBeInTheDocument();
      expect(getByText("Edit")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });
  });
 
  
  
  
  