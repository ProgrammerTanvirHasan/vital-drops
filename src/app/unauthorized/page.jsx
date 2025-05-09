"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
      >
        <motion.h1
          className="text-5xl font-bold text-red-600 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          403
        </motion.h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to view this page.{" "}
          <span className="text-red-400">Only Admin !</span>
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-shadow shadow-md hover:shadow-xl"
          >
            OK
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
