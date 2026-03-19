/**
 * ============================================================
 * DELIVERY SHEET
 * ============================================================
 *
 * Two-tab delivery options:
 *   • Pickup — station list → schedule (date + time slots)
 *   • Doorstep — name / address / city-state-country / zip form
 *
 * All form state is owned by the parent (CheckoutDrawer) so that
 * entered details persist when the user closes and reopens the sheet.
 *
 * The footer CTA confirms the selection and returns a summary.
 * ============================================================
 */

"use client";

import React from "react";
import { PICKUP_STATIONS, TIMEFRAMES } from "./constants";
import SheetFooterButton from "./SheetFooterButton";
import SheetHeader from "./SheetHeader";
import { useCheckoutTheme } from "./ThemeContext";
import type { DeliveryOption, DeliverySummary } from "./types";
import type { DateOption } from "./utils";

const STATE_OPTIONS = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const COUNTRY_OPTIONS = ["United States", "Canada", "Mexico"];

interface DoorDetails {
  fullname: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface DeliverySheetProps {
  onConfirm: (summary: DeliverySummary) => void;
  onClose: () => void;
  /* ── lifted state from parent ── */
  deliveryTab: DeliveryOption;
  tabVisible?: boolean;
  setDeliveryTab: (tab: DeliveryOption) => void;
  doorDetails: DoorDetails;
  setDoorDetails: React.Dispatch<React.SetStateAction<DoorDetails>>;
  selectedStation: string | null;
  setSelectedStation: (station: string | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  pickupView: "list" | "schedule";
  setPickupView: (view: "list" | "schedule") => void;
  availableDates: DateOption[];
}

export default function DeliverySheet({
  onConfirm,
  onClose,
  deliveryTab,
  tabVisible = true,
  setDeliveryTab,
  doorDetails,
  setDoorDetails,
  selectedStation,
  setSelectedStation,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  pickupView,
  setPickupView,
  availableDates,
}: DeliverySheetProps) {
  const updateDoorDetails = (field: keyof DoorDetails, value: string) => {
    setDoorDetails((prev) => ({ ...prev, [field]: value }));
  };

  /* ── derived validation ── */
  const isDoorValid =
    !!doorDetails.address &&
    !!doorDetails.city &&
    !!doorDetails.state &&
    !!doorDetails.country;
  const isPickupValid = !!selectedStation && !!selectedDate && !!selectedTime;
  const isConfirmDisabled =
    (deliveryTab === "door" && !isDoorValid) ||
    (deliveryTab === "pickup" && !isPickupValid);

  const handleConfirm = () => {
    if (deliveryTab === "door") {
      if (
        !doorDetails.address ||
        !doorDetails.city ||
        !doorDetails.state ||
        !doorDetails.country
      ) {
        return;
      }
      onConfirm({
        type: "door",
        title: "Door Delivery",
        subtitle: doorDetails.address,
      });
    } else {
      if (!selectedStation) return;
      const st = PICKUP_STATIONS.find((s) => s.id === selectedStation);
      onConfirm({
        type: "pickup",
        title: "Pickup Station",
        subtitle: st ? st.name : "Selected Station",
      });
    }
  };

  const theme = useCheckoutTheme();

  return (
    <div className="flex-1 flex flex-col pt-2 bg-white rounded-t-[24px] overflow-hidden">
      {/* Header */}
      <SheetHeader
        title="Delivery Options"
        subtitle={"How would you like to receive your order?"}
        onClose={onClose}
      />

      {/* Tab bar */}
      {tabVisible && (
        <div className="px-6 shrink-0 mb-4">
          <div
            className={`flex p-1 ${theme.rounded ? "rounded-xl" : "rounded-xs"}`}
            style={{ background: "rgba(0,0,0,0.03)" }}
          >
            <TabButton
              label="Pickup"
              icon={
                <img src={theme.pickupIcon} alt="Pickup" className="w-8 h-8" />
              }
              isActive={deliveryTab === "pickup"}
              onClick={() => setDeliveryTab("pickup")}
            />
            <TabButton
              label="Doorstep"
              icon={
                <img
                  src={theme.doorstepIcon}
                  alt="Doorstep"
                  className="w-10 h-10"
                />
              }
              isActive={deliveryTab === "door"}
              onClick={() => setDeliveryTab("door")}
            />
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto cart-drawer-scroll px-6 pb-20">
        {deliveryTab === "door" ? (
          /* ── Doorstep Form ── */
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
            <FormField
              label="Full Name"
              placeholder="John Doe"
              value={doorDetails.fullname}
              onChange={(v) => updateDoorDetails("fullname", v)}
            />
            <SelectField
              label="Country or region"
              placeholder="Select country"
              value={doorDetails.country}
              options={COUNTRY_OPTIONS}
              onChange={(v) => updateDoorDetails("country", v)}
            />
            <FormField
              label="Address Line 1"
              placeholder="123 Maison Blvd"
              value={doorDetails.address}
              onChange={(v) => updateDoorDetails("address", v)}
            />
            <FormField
              label="Address Line 2"
              placeholder="Apartment, suite, etc (optional)"
              value={doorDetails.address2}
              onChange={(v) => updateDoorDetails("address2", v)}
            />
            {/* City is now a text input instead of dropdown */}
            <FormField
              label="City"
              placeholder="Enter city"
              value={doorDetails.city}
              onChange={(v) => updateDoorDetails("city", v)}
            />
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="State"
                placeholder="Select state"
                value={doorDetails.state}
                options={STATE_OPTIONS}
                onChange={(v) => updateDoorDetails("state", v)}
              />
              <FormField
                label="Zip Code"
                placeholder="10012"
                value={doorDetails.zip}
                onChange={(v) => updateDoorDetails("zip", v)}
              />
            </div>
          </div>
        ) : (
          /* ── Pickup Flow ── */
          <div className="animate-in fade-in duration-200">
            {pickupView === "list" ? (
              /* Station list */
              <div className="flex flex-col">
                {PICKUP_STATIONS.map((station, idx) => (
                  <div key={station.id}>
                    <button
                      onClick={() => {
                        setSelectedStation(station.id);
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setPickupView("schedule");
                      }}
                      className="w-full flex items-center justify-between py-3.5 text-left transition-colors hover:bg-black/2"
                    >
                      <div className="min-w-0">
                        <p
                          className="text-[14px] leading-snug"
                          style={{
                            fontFamily: theme.fontFamily,
                            fontWeight: 600,
                            color: "var(--color-graphite)",
                          }}
                        >
                          {station.name}
                        </p>
                        <p
                          className="text-[12px] mt-0.5"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {station.address}
                        </p>
                      </div>
                      <span
                        className="text-[12px] font-medium shrink-0 ml-4"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {station.distance}
                      </span>
                    </button>
                    {idx < PICKUP_STATIONS.length - 1 && (
                      <div
                        className="h-px w-full"
                        style={{ background: "var(--color-sand)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Schedule view */
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Selected station info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0">
                    <p
                      className="text-[14px] font-semibold leading-snug"
                      style={{ color: "var(--color-graphite)" }}
                    >
                      {
                        PICKUP_STATIONS.find((s) => s.id === selectedStation)
                          ?.name
                      }
                    </p>
                    <p
                      className="text-[12px] mt-0.5"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {
                        PICKUP_STATIONS.find((s) => s.id === selectedStation)
                          ?.address
                      }
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPickupView("list");
                      setSelectedStation(null);
                    }}
                    className="text-[13px] font-medium shrink-0 ml-3"
                    style={{ color: theme.primaryColor }}
                  >
                    Edit
                  </button>
                </div>

                {/* Date picker row */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-5">
                  {availableDates.map((dateObj) => {
                    const isSelected = selectedDate === dateObj.full;
                    return (
                      <button
                        key={dateObj.full}
                        onClick={() => {
                          setSelectedDate(dateObj.full);
                          setSelectedTime(null);
                        }}
                        className="shrink-0 flex flex-col items-center gap-1.5"
                      >
                        <span
                          className="text-[10px] font-medium"
                          style={{
                            color: isSelected
                              ? theme.primaryColor
                              : "var(--color-taupe)",
                          }}
                        >
                          {dateObj.weekday}
                        </span>
                        <span
                          className="w-11 h-11 flex items-center justify-center rounded-full text-[11px] font-semibold transition-all"
                          style={{
                            background: isSelected
                              ? theme.primaryColor
                              : "rgba(0,0,0,0.05)",
                            color: isSelected
                              ? "#fff"
                              : "var(--color-graphite)",
                          }}
                        >
                          {dateObj.mmdd}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                <div className="flex flex-col -mx-6">
                  {TIMEFRAMES.map((tf, idx) => {
                    const isSelected = selectedTime === tf.label;
                    return (
                      <div key={tf.label}>
                        <button
                          onClick={() => setSelectedTime(tf.label)}
                          className="w-full flex-1 flex items-center gap-2 py-4 text-left transition-colors hover:bg-black/2 px-6"
                        >
                          {/* Radio circle */}
                          <div
                            className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                            style={{
                              borderColor: isSelected
                                ? theme.primaryColor
                                : "var(--color-taupe)",
                            }}
                          >
                            {isSelected && (
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  background: theme.primaryColor,
                                }}
                              />
                            )}
                          </div>
                          <span
                            className="flex-1 text-[14px]"
                            style={{
                              fontWeight: isSelected ? 600 : 500,
                              color: "var(--color-graphite)",
                            }}
                          >
                            {tf.label}
                          </span>
                          <span
                            className="text-[14px]"
                            style={{
                              fontWeight: isSelected ? 600 : 500,
                              color: "var(--color-graphite)",
                            }}
                          >
                            {tf.price}
                          </span>
                        </button>
                        {idx < TIMEFRAMES.length - 1 && (
                          <div
                            className="h-px w-full"
                            style={{
                              background: "var(--color-sand)",
                              opacity: 0.7,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Reservation note */}
                <p
                  className="text-center text-[11px] mt-4 pb-2"
                  style={{ color: "var(--color-muted)" }}
                >
                  Check out by 9:10pm to keep this reservation*
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky footer — show for doorstep always, pickup only in schedule view */}
      {(deliveryTab === "door" ||
        (deliveryTab === "pickup" && pickupView === "schedule")) && (
        <SheetFooterButton
          label="Confirm delivery"
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
        />
      )}
    </div>
  );
}

/* ─── Local helpers ─────────────────────────────────────────── */

/** Simple tab toggle button */
function TabButton({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const theme = useCheckoutTheme();
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1 py-0.5 font-semibold text-[15px] transition-all ${theme.rounded ? "rounded-lg" : "rounded-xs"}`}
      style={{
        background: isActive ? "#fff" : "transparent",
        color: isActive ? theme.primaryColor : "var(--color-muted)",
        boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/** Reusable form field (label + text input) */
function FormField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const theme = useCheckoutTheme();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-gray-600">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors ${theme.rounded ? "rounded-xl" : "rounded-none"}`}
      />
    </div>
  );
}

/** Reusable form field (label + select dropdown) */
function SelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const theme = useCheckoutTheme();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-gray-600">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-white px-4 py-3 pr-9 border border-gray-200 text-[14px] focus:outline-none focus:border-gray-800 transition-colors ${theme.rounded ? "rounded-xl" : "rounded-none"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none rotate-90 absolute right-3 top-1/2 -translate-y-1/2 text-[24px]"
          style={{ color: "var(--color-muted)" }}
        >
          &#8250;
        </span>
      </div>
    </div>
  );
}
