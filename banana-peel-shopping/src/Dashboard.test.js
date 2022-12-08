/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/await-async-query */
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard, {Products, Item} from './Dashboard.js';
import "@testing-library/jest-dom/extend-expect";




describe("Checks the Dashboard UI",()=>{
    afterEach(cleanup);

    it("has a quick look button", async ()=>{
        render(<Dashboard/>)
        fireEvent.mouseOver(screen.getByTestId("products-item1"));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => expect(screen.findByTestId("look-btn")).toBeInTheDocument());
    }); //passed

    it("has a cart button",()=>{
        render(<Dashboard />)
        const cart=screen.getByTestId("cart-btn");
        expect(cart).toBeInTheDocument();
    }) // passed

    it("has a collection for products",()=>{
        render(<Dashboard />)
        const container=screen.getByTestId("products-container");
        expect(container).toBeInTheDocument();
    }) //passed

    it("checks first product in the dashboard",()=>{
        render(<Dashboard />)
        const proItem=screen.getByTestId("products-item1");
        expect(proItem).toBeTruthy();
    })

    it("checks all products in the dashboard",()=>{
        render(<Dashboard />)
        const proItem=screen.getAllByRole("products-item");
        expect(proItem).toBeTruthy();
    }) // passed

     

    it("displays a modal", async ()=>{
        render(<Dashboard/>)
        fireEvent.mouseEnter(screen.getByTestId("products-item1"));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            const btn = screen.getByTestId("look-btn");
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.click(btn);
            waitFor(() => expect(screen.getByTestId("modal")).toBeInTheDocument());
        }); 
    
        
    }); 
    // it("has products in the dashboard",()=>{
    //     render(<Dashboard />)

        
    // })

    // it("has a buy button", ()=>{
    //     render(<Dashboard />)
    //     const buy =screen.getByTestId("buy-btn", {name: /BUY/i,hidden:true });
    //     expect(buy).toHaveClass(buyItem);
    // }) //not sure how to test hidden buttons

    // it("Checks the number of products in the dashboard",()=>{
    //     render(<Dashboard />)
    //     expect(screen.findByText('bohemian dreams - light red')).toBeInTheDocument();
    //     expect(screen.getByTestId('prodcuts').length).toBe(4);
    // }) //not sure pako ani

    // it("has a buy button",()=>{
    //     render(<Dashboard />)
    //     const buy=screen.getByTestId("buy-btn");
    //     expect(buy).toBeInTheDocument();
    // })
})