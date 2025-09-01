'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { memo, useMemo } from 'react';

interface DateSelectorProps {
  month?: string;
  setMonth?: (m: string) => void;
  year: string;
  setYear: (y: string) => void;
}

export const DateSelector = memo(
  ({ month, setMonth, year, setYear }: DateSelectorProps) => {
    const months = useMemo(
      () =>
        Array.from({ length: 12 }, (_, i) =>
          (i + 1).toString().padStart(2, '0')
        ),
      []
    );

    return (
      <div className="flex items-center space-x-6">
        {month !== undefined && setMonth && (
          <div className="flex gap-2 items-center">
            <Label htmlFor="month">Month:</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger id="month" className="w-24">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(val => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Label htmlFor="year">Year:</Label>
          <Input
            id="year"
            type="number"
            min={2000}
            max={2100}
            value={year}
            onChange={e => setYear(e.target.value)}
            className="w-24"
          />
        </div>
      </div>
    );
  }
);
