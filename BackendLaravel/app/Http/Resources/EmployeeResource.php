<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'               => $this['id'],
            'fullName'         => $this['fullName'],
            'gender'           => $this['gender'],
            'maritalStatus'    => $this['maritalStatus'],
            'phone'            => $this['phone'],
            'email'            => $this['email'],
            'address'          => $this['address'],
            'dateOfBirth'      => $this['dateOfBirth'],
            'nationality'      => $this['nationality'],
            'hireDate'         => $this['hireDate'],
            'department'       => $this['department'],
            'jobTitle'         => $this['jobTitle'],
            'employmentType'   => $this['employmentType'],
            'emergencyContact' => $this['emergencyContact'] ?? null,
            'createdAt'        => $this['createdAt'],
        ];
    }
}