import { render, screen, fireEvent, act } from "@testing-library/react";
import { SnackbarProvider, useSnackbar } from "../snackbarContext";
import SnackbarTypes from "~/constants/snackbarTypes";

const TestComponent = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <button data-testid="show-snackbar" onClick={() => showSnackbar("Hello there", SnackbarTypes.SUCCESS)}>
      Show Snackbar
    </button>
  );
};

describe("SnackbarContext", () => {
  test("should show snackbar when showSnackbar is called", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const button = screen.getByTestId("show-snackbar");
    fireEvent.click(button);

    expect(screen.getByTestId("snackbar").className.includes("show")).toBeTruthy();
  });

  test("should hide snackbar after 3 seconds", async () => {
    jest.useFakeTimers();

    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const button = screen.getByTestId("show-snackbar");
    fireEvent.click(button);

    expect(screen.getByTestId("snackbar").className.includes("show")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    expect(
      screen.getByTestId("snackbar").className.includes("show")
    ).toBeFalsy();

    jest.useRealTimers();
  });
});
