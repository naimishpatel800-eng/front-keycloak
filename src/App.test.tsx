// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// const App = () => <div>hello test</div>;

// beforeAll(()=>{
//   console.log("<<<<<<<<<<<<<<<Before All >>>>>>>>>>>>>");

// });
// beforeEach(()=>{
//   console.log("Before Each>>>>>>>>>>>>>>>")
// })
// afterAll(()=>{
//   console.log("After all>>>>>>>>>>>>")
// })
// afterEach(()=>{
//   console.log("After Each >>>>>>>>>>>>>")
// })

// describe('App component', () => {
//   it('renders hello test', () => {
//     render(<App />);
//     expect(screen.getByText('hello test')).toBeInTheDocument();
//   });
 
// });
// describe('App component 2', () => {
//   it('renders hello test', () => {
//     render(<App />);
//     expect(screen.getByText('hello test')).toBeInTheDocument();
//   });
// });
const testAppRendering = (testName: string, expectedText: string) => {
  it(testName, () => {
    render(<App />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
};


describe('App component', () => {
  testAppRendering('renders hello test', 'hello test');
});


describe('App component 2', () => {
  testAppRendering('renders hello test', 'hello test');
});
test("testing you name",()=>{
      render(<App  />);
    let checkInput=screen.getByRole("textbox");
    let placeholder=screen.getByPlaceholderText("pelse enter name");
    expect(checkInput).toBeInTheDocument()
    expect(placeholder).toBeInTheDocument()

})
// test("test snnapshote",()=>{
//  const snnapshote= render(<App />)
//   expect(snnapshote).toMatchSnapshot();
// })
it('test button', async()=>{
   render(<App />);
   const button=screen.getByRole('button',{name:"hello-1"})


   const button1=screen.getByRole('button',{name:"hello-2"})
})
test('Test By Get Tile',()=>{
  render(<App />)
  const Abc=screen.getByTitle('click')
  expect(Abc).toBeInTheDocument();

})
