import sum from "./sum";

test("testing for sum fuction",()=>{
    expect(sum(10,10)).toBe(20);
})

test("testing for sum fuction2",()=>{
    expect(sum(10,100)).toBe(110);
})

test("testing for sum fuction3",()=>{
    expect(sum(1,10)).toBe(11);
})

test("testing for sum fuction4",()=>{
    expect(sum(101,10)).toBe(111);
})

test("testing for sum fuction5",()=>{
    expect(sum(111,10)).toBe(121);
})


