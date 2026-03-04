"use client";

import React, { useState } from 'react';
// ============================================================
// SHIPPING FORM — Bangladesh-localized (District + Upazila)
// Phone validation: +880 format
// ============================================================

import { ChevronRightIcon } from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '../../constants/shipping';
import type { ShippingAddress, ShippingErrors } from '../../types';
import { Button } from '../ui/Button';
interface ShippingFormProps {
  address: ShippingAddress;
  onChange: (address: ShippingAddress) => void;
  onBack: () => void;
  onNext: () => void;
}
function validateBDPhone(phone: string): boolean {
  // Accepts: 01XXXXXXXXX (11 digits) or +8801XXXXXXXXX
  return /^(\+880|0)1[3-9]\d{8}$/.test(phone.replace(/\s/g, ''));
}
export function ShippingForm({
  address,
  onChange,
  onBack,
  onNext
}: ShippingFormProps) {
  const [errors, setErrors] = useState<ShippingErrors>({});
  const set = (field: keyof ShippingAddress, value: string) => {
    onChange({
      ...address,
      [field]: value,
      ...(field === 'district' ?
        {
          upazila: ''
        } :
        {})
    });
    if (errors[field])
      setErrors((e) => ({
        ...e,
        [field]: undefined
      }));
  };
  const upazilas =
    BANGLADESH_DISTRICTS.find((d) => d.name === address.district)?.upazilas ??
    [];
  const validate = (): boolean => {
    const e: ShippingErrors = {};
    if (!address.firstName) e.firstName = 'Required';
    if (!address.lastName) e.lastName = 'Required';
    if (!address.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email))
      e.email = 'Valid email required';
    if (!validateBDPhone(address.phone))
      e.phone = 'Enter valid BD number (e.g. 01XXXXXXXXX)';
    if (!address.address) e.address = 'Required';
    if (!address.district) e.district = 'Select a district';
    if (!address.upazila) e.upazila = 'Select an upazila';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleNext = () => {
    if (validate()) onNext();
  };
  const Field = ({
    label,
    name,
    type = 'text',
    placeholder





  }: { label: string; name: keyof ShippingAddress; type?: string; placeholder?: string; }) =>
    <div>
      <label className="block text-xs font-body font-medium text-gray-700 mb-1.5">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        type={type}
        value={address[name]}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm font-body border rounded focus:outline-none focus:ring-2 focus:ring-forest/30 transition-colors ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-forest'}`} />

      {errors[name] &&
        <p className="text-red-500 text-xs font-body mt-1">{errors[name]}</p>
      }
    </div>;

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h2 className="font-heading text-xl font-semibold text-forest mb-6">
        Delivery Address
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" name="firstName" placeholder="Rahim" />
        <Field label="Last Name" name="lastName" placeholder="Uddin" />
        <div className="col-span-2">
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="rahim@example.com" />

        </div>
        <div className="col-span-2">
          <label className="block text-xs font-body font-medium text-gray-700 mb-1.5">
            Phone <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded text-sm font-body text-gray-500 whitespace-nowrap">
              🇧🇩 +880
            </span>
            <input
              type="tel"
              value={address.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="01XXXXXXXXX"
              className={`flex-1 px-4 py-3 text-sm font-body border rounded focus:outline-none focus:ring-2 focus:ring-forest/30 transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-forest'}`} />

          </div>
          {errors.phone &&
            <p className="text-red-500 text-xs font-body mt-1">
              {errors.phone}
            </p>
          }
        </div>
        <div className="col-span-2">
          <Field
            label="Street Address"
            name="address"
            placeholder="House 12, Road 5, Block C" />

        </div>

        {/* District dropdown */}
        <div>
          <label className="block text-xs font-body font-medium text-gray-700 mb-1.5">
            District <span className="text-red-400">*</span>
          </label>
          <select
            value={address.district}
            onChange={(e) => set('district', e.target.value)}
            className={`w-full px-4 py-3 text-sm font-body border rounded focus:outline-none focus:ring-2 focus:ring-forest/30 bg-white ${errors.district ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-forest'}`}>

            <option value="">Select District</option>
            {BANGLADESH_DISTRICTS.map((d) =>
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            )}
          </select>
          {errors.district &&
            <p className="text-red-500 text-xs font-body mt-1">
              {errors.district}
            </p>
          }
        </div>

        {/* Upazila dropdown */}
        <div>
          <label className="block text-xs font-body font-medium text-gray-700 mb-1.5">
            Area / Upazila <span className="text-red-400">*</span>
          </label>
          <select
            value={address.upazila}
            onChange={(e) => set('upazila', e.target.value)}
            disabled={!address.district}
            className={`w-full px-4 py-3 text-sm font-body border rounded focus:outline-none focus:ring-2 focus:ring-forest/30 bg-white disabled:opacity-50 ${errors.upazila ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-forest'}`}>

            <option value="">Select Upazila</option>
            {upazilas.map((u) =>
              <option key={u} value={u}>
                {u}
              </option>
            )}
          </select>
          {errors.upazila &&
            <p className="text-red-500 text-xs font-body mt-1">
              {errors.upazila}
            </p>
          }
        </div>
      </div>

      {/* Shipping info banner */}
      {address.district &&
        <div className="mt-4 p-3 bg-forest/5 rounded-lg text-xs font-body text-forest flex items-center gap-2">
          🚚 Delivery charge:{' '}
          <strong>
            {address.district === 'Dhaka' ?
              '৳60 (Inside Dhaka)' :
              '৳120 (Outside Dhaka)'}
          </strong>
          {' — '}Free above ৳5,000
        </div>
      }

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-5 py-3 text-sm font-body font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors">

          ← Back
        </button>
        <Button
          variant="primary"
          className="flex-1"
          size="lg"
          onClick={handleNext}>

          Continue to Payment <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>);

}