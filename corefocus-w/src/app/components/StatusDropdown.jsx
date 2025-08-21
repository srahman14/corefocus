"use client";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusDropdown({ status, setStatus }) {
  const statuses = [
    { value: "draft", label: "Draft" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <Select.Root value={status} onValueChange={setStatus}>
      <Select.Trigger
        className="inline-flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-none outline-none text-gray-700 hover:bg-gray-200/50 transition-colors duration-200 w-full"
      >
        <Select.Value placeholder="Select a status" />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal forceMount>
        <AnimatePresence>
          <Select.Content
            className="w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white z-50"
            position="popper"
            sideOffset={5}
          >
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Select.Viewport className="p-2">
                {statuses.map((s) => (
                  <Select.Item
                    key={s.value}
                    value={s.value}
                    className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer text-gray-700 transition-colors duration-200 hover:bg-gray-100
                      ${status === s.value ? "bg-gray-100 font-medium" : ""}`}
                  >
                    <Select.ItemText>{s.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </motion.div>
          </Select.Content>
        </AnimatePresence>
      </Select.Portal>
    </Select.Root>
  );
}
