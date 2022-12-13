/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/valid-expect */
import Cart from './Cart';
import Dashboard from '../dashboard/Dashboard';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('This is checks the cart UI',()=>{
    afterEach(cleanup);

    it("checks the home buttons link",()=>{
        render(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
            </Routes>
        </MemoryRouter>);
    });

    it("checks for the home button",()=>{
        render(<Cart />,{wrapper: MemoryRouter});

        expect(screen.findByText("Cart is empty.")).toBeInTheDocument();
    })
})
