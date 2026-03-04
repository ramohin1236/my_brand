"use client";

import React, { useState } from 'react';
// ============================================================
// INVOICE BUTTON — triggers print/download of invoice
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { PrinterIcon, XIcon, DownloadIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { InvoiceView } from './InvoiceView';
import type { Order } from '../../store/orderSlice';
interface InvoiceButtonProps {
  order: Order;
}
export function InvoiceButton({ order }: InvoiceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Button variant="outline" size="md" onClick={() => setIsOpen(true)}>
        <DownloadIcon className="w-4 h-4 mr-2" />
        Download Invoice
      </Button>

      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">

            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              exit={{
                scale: 0.95,
                opacity: 0
              }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 print:hidden">
                <h3 className="font-heading text-lg font-bold text-forest">
                  Invoice Preview
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 text-sm font-body font-medium bg-forest text-white px-4 py-2 rounded hover:bg-forest-light transition-colors">

                    <PrinterIcon className="w-4 h-4" /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded">

                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <InvoiceView order={order} />
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}