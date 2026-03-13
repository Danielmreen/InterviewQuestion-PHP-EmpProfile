<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fullName'         => ['required', 'string', 'min:2', 'max:100'],
            'gender'           => ['required', 'in:Male,Female,Non-binary,Prefer not to say'],
            'maritalStatus'    => ['required', 'in:Single,Married,Divorced,Widowed'],
            'phone'            => ['required', 'regex:/^\+?[\d\s\-()]{7,15}$/'],
            'email'            => ['required', 'email:rfc,dns'],
            'address'          => ['required', 'string', 'min:5', 'max:300'],
            'dateOfBirth'      => ['required', 'date', 'before:-16 years', 'after:-100 years'],
            'nationality'      => ['required', 'string', 'max:60'],
            'hireDate'         => ['required', 'date', 'before_or_equal:today'],
            'department'       => ['required', 'in:Engineering,Product,Design,Marketing,Sales,Finance,Human Resources,Operations,Legal,Customer Support'],
            'jobTitle'         => ['required', 'string', 'min:2', 'max:80'],
            'employmentType'   => ['required', 'in:Full-Time,Part-Time,Contract,Intern'],
            'emergencyContact' => ['nullable', 'string', 'max:150'],
        ];
    }

    public function messages(): array
    {
        return [
            'fullName.required'      => 'Full name is required.',
            'fullName.min'           => 'Name must be at least 2 characters.',
            'gender.in'              => 'Please select a valid gender option.',
            'maritalStatus.in'       => 'Please select a valid marital status.',
            'phone.regex'            => 'Invalid phone number format.',
            'email.email'            => 'Invalid email address.',
            'dateOfBirth.before'     => 'Employee must be at least 16 years old.',
            'dateOfBirth.after'      => 'Employee must not be older than 100 years.',
            'hireDate.before_or_equal' => 'Hire date cannot be in the future.',
            'department.in'          => 'Please select a valid department.',
            'employmentType.in'      => 'Please select a valid employment type.',
        ];
    }

    // Return JSON 422 with field-keyed errors (matches React error state shape)
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),   // { field: ["msg"] }
            ], 422)
        );
    }
}