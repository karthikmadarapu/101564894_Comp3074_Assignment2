// ------------------------------------------------------------
// payCalculator.js
// Pure logic only: no UI, no React. Easy to read, test and change.
// INTERVIEW TIP: "change the overtime rule / tax rule" -> edit THIS file.
// ------------------------------------------------------------

export const REGULAR_HOURS = 40;        // hours before overtime starts
export const OVERTIME_MULTIPLIER = 1.5; // time-and-a-half

// Turns a text field value into a number, or returns null if invalid.
// Number("") is 0 and parseFloat("12abc") is 12, so we check carefully.
export function toNumber(text) {
  const trimmed = String(text).trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  if (Number.isNaN(value) || !Number.isFinite(value)) return null;
  return value;
}

// Main calculation, exactly as the assignment specifies.
// taxRatePercent is entered as a percentage, e.g. 13 means 13%.
export function calculatePay(hours, hourlyRate, taxRatePercent) {
  let pay;
  let overtimePay;

  if (hours <= REGULAR_HOURS) {
    pay = hours * hourlyRate;
    overtimePay = 0;
  } else {
    pay = REGULAR_HOURS * hourlyRate;
    overtimePay = (hours - REGULAR_HOURS) * hourlyRate * OVERTIME_MULTIPLIER;
  }

  const totalPay = pay + overtimePay;
  const tax = pay * (taxRatePercent / 100); // spec: tax = pay x tax_rate

  return { pay, overtimePay, totalPay, tax };
}
