import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const zPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {

    defaultCountry: 'GH',
    
    extract: false,
  });

  // VALID PHONE NUMBER
  if (phone && phone.isValid()) {
    return phone.number;
  }

  // INVALID PHONE NUMBER
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Invalid phone number',
  });
  return z.NEVER;
});