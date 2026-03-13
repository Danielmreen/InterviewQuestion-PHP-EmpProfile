<?php


namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EmployeeStorageService
{
    private const FILE = 'employees.json';

    /** Return all employees as an array. */
    public function all(): array
    {
        if (!Storage::exists(self::FILE)) {
            return [];
        }

        $data = json_decode(Storage::get(self::FILE), true);
        return is_array($data) ? $data : [];
    }

    /** Persist a new employee record and return it with generated id & timestamp. */
    public function create(array $data): array
    {
        $employees = $this->all();

        $record = array_merge($data, [
            'id'        => (string) Str::uuid(),
            'createdAt' => now()->toISOString(),
        ]);

        $employees[] = $record;

        Storage::put(self::FILE, json_encode($employees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        return $record;
    }
}