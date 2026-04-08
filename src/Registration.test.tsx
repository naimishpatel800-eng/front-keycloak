import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Registration from "./registration/Registration";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


jest.mock("primereact/calendar", () => ({
  Calendar: (props: any) => (
    <input
      data-testid="dob-input"
      onChange={(e) =>
        props.onChange({ value: new Date(e.target.value) })
      }
    />
  ),
}));

jest.mock("primereact/password", () => ({
  Password: (props: any) => (
    <input
      type="password"
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) =>
        props.onChange({
          target: { name: props.name, value: e.target.value },
        })
      }
    />
  ),
}));


jest.mock("primereact/radiobutton", () => ({
  RadioButton: (props: any) => (
    <input
      type="radio"
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={() => props.onChange({ value: props.value })}
    />
  ),
}));


jest.mock("primereact/inputswitch", () => ({
  InputSwitch: (props: any) => (
    <input
      type="checkbox"
      data-testid={props["data-testid"]}
      checked={props.checked}
      onChange={(e) => props.onChange({ value: e.target.checked })}
    />
  ),
}));

describe("Registration Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders registration form", () => {
    render(<Registration />);
    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<Registration />);

    fireEvent.submit(screen.getByTestId("registration-form"));

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name required/i)).toBeInTheDocument();
    expect(screen.getByText(/email required/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm password required/i)).toBeInTheDocument();
    expect(screen.getByText(/contact required/i)).toBeInTheDocument();
    expect(screen.getByText(/select gender/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth required/i)).toBeInTheDocument();
    expect(screen.getByText(/you must accept/i)).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(<Registration />);


    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/contact number/i), {
      target: { value: "9876543210" },
    });

    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    fireEvent.change(passwordInputs[0], {
      target: { value: "Password123!" },
    });
    fireEvent.change(passwordInputs[1], {
      target: { value: "Password123!" },
    });

  
    fireEvent.click(screen.getByDisplayValue("Male"));


    fireEvent.change(screen.getByTestId("dob-input"), {
      target: { value: "2000-01-01" },
    });


    fireEvent.click(screen.getByTestId("accept-terms-switch"));

    fireEvent.submit(screen.getByTestId("registration-form"));

    // Assert API call
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  test("handles API failure", async () => {
    mockedAxios.post.mockRejectedValue(new Error("API Error"));

    render(<Registration />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/contact number/i), {
      target: { value: "9876543210" },
    });

    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    fireEvent.change(passwordInputs[0], {
      target: { value: "Password123!" },
    });
    fireEvent.change(passwordInputs[1], {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByDisplayValue("Male"));

    fireEvent.change(screen.getByTestId("dob-input"), {
      target: { value: "2000-01-01" },
    });

    fireEvent.click(screen.getByTestId("accept-terms-switch"));

    fireEvent.submit(screen.getByTestId("registration-form"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });
});	