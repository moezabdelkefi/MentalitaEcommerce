export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-07-07';

export const dataset = assertValue(
  "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  "96m80dn3",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const useCdn = false;

function assertValue(v, errorMessage) {
  if (v === undefined) {
    throw new Error(errorMessage);
  } 
  return v;
}