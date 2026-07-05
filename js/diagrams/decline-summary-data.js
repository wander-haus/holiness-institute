// National sacramental summary — generated from client-documents/
// "Sacramental Data w updated 21-41.xlsx"; regenerate rather than hand-edit.
// YEARS are RECEPTION years: the workbook's sheets are labeled by submission
// year, one year after the sacraments they report (Steve, July 5, 2026), so
// each sheet year is shifted down by one (the "2016" sheet already held 2015
// data). The final entry (2024 receptions, submitted 2025) is kept in the
// data but excluded from every chart until the final 2025 data arrives.
// Rates are per 1,000 Catholics, computed over dioceses reporting both the
// measure and Catholic population in a given year. POPULATION totals are the
// sum of reported Catholic population over dioceses reporting it that year
// (coverage grows across the century — see sacramental-data.html methodology).
// Used by the Holiness page's small chart, the About page's deficit chart,
// and re-exported by decline-data.js for the data page.

export const YEARS=[1920,1930,1940,1945,1950,1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2015,2020,2024];
export const NATIONAL={
inf:{label:"Infant Baptisms",rates:[37.405,32.286,26.713,26.138,33.848,32.749,27.953,23.019,18.699,18.731,18.647,17.828,17.382,16.306,14.208,12.159,9.857,6.142,7.103]},
tmar:{label:"Total Marriages",rates:[10.613,10.163,12.364,9.245,11.465,7.761,7.846,9.843,7.761,7.194,6.861,5.981,5.192,4.288,3.241,2.533,2.143,1.452,1.617]},
rec:{label:"Received into Full Communion",rates:[3.122,2.34,3.411,2.784,3.958,3.282,2.681,1.742,1.647,1.779,1.715,1.222,1.416,1.632,1.28,1.072,0.963,0.686,0.862]},
};
export const POPULATION={label:"Catholic Population",totals:[17240868,19538273,22151765,26668579,28769878,40112956,44249611,45822044,46744335,50279997,50499228,53738454,57003871,60571386,64544448,65390895,67718094,66823833,66251666]};
