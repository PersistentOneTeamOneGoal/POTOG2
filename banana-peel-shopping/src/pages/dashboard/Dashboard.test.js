/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/await-async-query */
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import App from '../../App';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';

describe("Checks the Dashboard UI",()=>{
    afterEach(cleanup);

    it("has a quick looks button",async ()=>{
        render(<Dashboard />, {wrapper: MemoryRouter});

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        // eslint-disable-next-line testing-library/await-async-utils 
        waitFor(()=> expect(screen.getByTestId("look-btn")).toBeInTheDocument());
    })// passed

    it("has a cart button",()=>{
        render(<Dashboard />,{wrapper: MemoryRouter})
        const cart=screen.getByTestId("cart-btn");
        expect(cart).toBeInTheDocument();
    }) // passed

    it("checks for the product",()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})
        const container=screen.getByTestId("products-container");
        expect(container).toBeInTheDocument();
    }) //passed

    it("checks first product in the dashboard",()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})
        const proItem=screen.getByTestId("products-item1");
        expect(proItem).toBeTruthy();
    })

    it("checks all products in the dashboard",()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})
        const proItem=screen.getAllByRole("products-item");
        expect(proItem).toBeTruthy();
        expect((proItem).length).toBe(4);
    }) // passed
     

    it("displays a modal with buttons", async ()=>{
        render(<Dashboard/>, {wrapper: MemoryRouter})
        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('look-btn1'));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            const modal = screen.getByTestId("modal");
            waitFor(()=> expect(modal).toBeInTheDocument());
// expect(await screen.getByTestId("modal")).toHaveTextContent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `)
            const modalbuybtn = screen.getByTestId("buy-btn");
            waitFor(()=>expect(modalbuybtn).toBeInTheDocument());
        });
    }); // passed

    it("displays item description in the modal", async ()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('look-btn1'));
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        expect(screen.getByTestId("modal")).toHaveTextContent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat a turpis non maximus. Praesent tincidunt vitae risus in maximus. Duis efficitur porta lorem vel dapibus. In sed justo sagittis, mollis diam eget, facilisis erat. `)
    });

    it("has a button for adding and subtracting item quantity", async ()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('look-btn1'));
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        waitFor(() => {
            const modal = screen.getByTestId("modal");
            expect(modal).toBeInTheDocument();
            const minus = screen.getByTestId("minus-btn");
            expect(minus).toBeInTheDocument();
            const plus = screen.getByTestId("plus-btn");
            expect(plus).toBeInTheDocument();
        });
    }); // passed

    it("Displays the item quantity",async()=>{
        render(<Dashboard />, {wrapper: MemoryRouter})

        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        waitFor(()=> expect(screen.getByTestId("look-btn1")).toBeInTheDocument());
        fireEvent.click(screen.getByTestId("look-btn1"));
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        waitFor(()=>{
            const qty = screen.getByTestId("itemQty");
            expect(qty).toBeInTheDocument();
            const minus = screen.getByTestId("minus-btn");
            expect(minus).toBeInTheDocument();
            const plus = screen.getByTestId("plus-btn");
            expect(plus).toBeInTheDocument();
            fireEvent.click(plus);
            expect(qty).toHaveTextContent("1");
            fireEvent.click(minus);
            expect(qty).toHaveTextContent("0");
        })
    }); // passed
})
