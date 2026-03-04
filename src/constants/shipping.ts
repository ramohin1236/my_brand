// ============================================================
// BANGLADESH SHIPPING CONSTANTS
// Districts, Upazilas, and shipping rate logic
// ============================================================

export interface District {
  name: string;
  upazilas: string[];
}

export const BANGLADESH_DISTRICTS: District[] = [
{
  name: 'Dhaka',
  upazilas: [
  'Dhanmondi',
  'Gulshan',
  'Banani',
  'Mirpur',
  'Mohammadpur',
  'Uttara',
  'Motijheel',
  'Tejgaon',
  'Rampura',
  'Badda',
  'Khilgaon',
  'Demra',
  'Lalbagh',
  'Hazaribagh',
  'Sabujbagh']

},
{
  name: 'Chattogram',
  upazilas: [
  'Kotwali',
  'Pahartali',
  'Panchlaish',
  'Bayazid',
  'Chandgaon',
  'Halishahar',
  'Double Mooring',
  'Bandar',
  'Sitakunda',
  'Mirsharai']

},
{
  name: 'Sylhet',
  upazilas: [
  'Sylhet Sadar',
  'Beanibazar',
  'Bishwanath',
  'Companiganj',
  'Fenchuganj',
  'Golapganj',
  'Gowainghat',
  'Jaintiapur',
  'Kanaighat']

},
{
  name: 'Rajshahi',
  upazilas: [
  'Rajshahi Sadar',
  'Bagha',
  'Bagmara',
  'Charghat',
  'Durgapur',
  'Godagari',
  'Mohanpur',
  'Paba',
  'Puthia',
  'Tanore']

},
{
  name: 'Khulna',
  upazilas: [
  'Khulna Sadar',
  'Batiaghata',
  'Dacope',
  'Dumuria',
  'Dighalia',
  'Koyra',
  'Paikgachha',
  'Phultala',
  'Rupsha',
  'Terokhada']

},
{
  name: 'Barishal',
  upazilas: [
  'Barishal Sadar',
  'Agailjhara',
  'Babuganj',
  'Bakerganj',
  'Banaripara',
  'Gaurnadi',
  'Hizla',
  'Mehendiganj',
  'Muladi',
  'Wazirpur']

},
{
  name: 'Rangpur',
  upazilas: [
  'Rangpur Sadar',
  'Badarganj',
  'Gangachara',
  'Kaunia',
  'Mithapukur',
  'Pirgachha',
  'Pirganj',
  'Taraganj']

},
{
  name: 'Mymensingh',
  upazilas: [
  'Mymensingh Sadar',
  'Bhaluka',
  'Dhobaura',
  'Fulbaria',
  'Gaffargaon',
  'Gauripur',
  'Haluaghat',
  'Ishwarganj',
  'Muktagachha']

},
{
  name: 'Cumilla',
  upazilas: [
  'Cumilla Sadar',
  'Barura',
  'Brahmanpara',
  'Burichang',
  'Chandina',
  'Chauddagram',
  'Daudkandi',
  'Debidwar',
  'Homna']

},
{
  name: 'Narayanganj',
  upazilas: [
  'Narayanganj Sadar',
  'Araihazar',
  'Bandar',
  'Rupganj',
  'Sonargaon']

},
{
  name: 'Gazipur',
  upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur']
},
{
  name: 'Manikganj',
  upazilas: [
  'Manikganj Sadar',
  'Daulatpur',
  'Ghior',
  'Harirampur',
  'Saturia',
  'Shivalaya',
  'Singair']

},
{
  name: 'Narsingdi',
  upazilas: [
  'Narsingdi Sadar',
  'Belabo',
  'Monohardi',
  'Palash',
  'Raipura',
  'Shibpur']

},
{
  name: 'Tangail',
  upazilas: [
  'Tangail Sadar',
  'Basail',
  'Bhuapur',
  'Delduar',
  'Dhanbari',
  'Ghatail',
  'Gopalpur',
  'Kalihati',
  'Madhupur',
  'Mirzapur']

}];


// ---- SHIPPING RATE LOGIC ----

/** Inside Dhaka city delivery charge in BDT */
export const SHIPPING_INSIDE_DHAKA = 70;

/** Outside Dhaka (rest of Bangladesh) delivery charge in BDT */
export const SHIPPING_OUTSIDE_DHAKA = 150;

/** Free shipping threshold in BDT */
export const FREE_SHIPPING_THRESHOLD = 5000;

/**
 * Calculate shipping cost based on district and order total
 */
export function calculateShipping(
district: string,
orderTotal: number)
: number {
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return district === 'Dhaka' ? SHIPPING_INSIDE_DHAKA : SHIPPING_OUTSIDE_DHAKA;
}

/**
 * Get shipping label for display
 */
export function getShippingLabel(district: string): string {
  return district === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka';
}