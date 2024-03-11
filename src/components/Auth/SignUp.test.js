import React from "react";
import {render, screen} from '@testing-library/react'
import {SignUp} from "./SignUp";


describe('Sign Up component', () => {
    test('has header', () => {
        render(<SignUp />); 
        const header = screen.getByText(/SignUp/); 
        expect(header).toBeInTheDocument(); 
    });
});

