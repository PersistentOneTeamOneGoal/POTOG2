/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/valid-expect */
import Cart from './Cart';
import App from '../../App';
import Dashboard from '../dashboard/Dashboard';
import Checkout from '../checkout/Checkout';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('This is checks the cart UI',()=>{
    afterEach(cleanup);

    it("checks the home button",()=>{
        render(<App />, {wrapper: MemoryRouter});

        const home= waitFor(()=> screen.getByTestId("home-btn"));
        expect(home).toBeTruthy();
    });
    it("checks for a product in the cart", async()=>{
        render(<App />, {wrapper: MemoryRouter});

        const item = waitFor(()=> screen.getByTestId("item"));
        expect(item).toBeTruthy();
    });
    it("has a checkout link",()=>{
        render(<MemoryRouter>
            <Routes>
                <Route path="/Checkout" element={<Checkout />}/>
            </Routes>
        </MemoryRouter>,
        );
    });
    it("has a clear all button",async()=>{
        render(<App />,{wrapper: MemoryRouter});

        const clear = waitFor(()=> screen.getByTestId("clear-btn"));
        expect(clear).toBeTruthy();
    });

    it("has a button to add item for checkout",()=>{
        const add = waitFor(()=> screen.getByTestId("add-btn"));
        expect(add).toBeTruthy();
    })

    it("has a button for adding and subtracting item quantity", async ()=>{
        render(<App />, {wrapper: MemoryRouter})
        // render(<Dashboard />, {wrapper: MemoryRouter})
        waitFor(() => {
            const minus = screen.getByTestId("minus");
            expect(minus).toBeInTheDocument();
            const plus = screen.getByTestId("plus");
            expect(plus).toBeInTheDocument();
        });
    });

    it("checks the functionalities",async()=>{
        render(<App />, {wrapper: MemoryRouter})

        waitFor(()=>{
            const qty = screen.getByTestId("qty");
            const add = screen.getByTestId("plus");
            expect(add).toBeInTheDocument();
            fireEvent.click(add);
            expect(qty).toHaveTextContent("2");
            const minus = screen.getByTestId("minus");
            expect(minus).toBeInTheDocument();
            fireEvent.click(minus);
            expect(qty).toHaveTextContent("1");
        })
    })
})
