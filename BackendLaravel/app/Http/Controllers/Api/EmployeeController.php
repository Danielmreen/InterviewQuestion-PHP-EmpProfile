<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Services\EmployeeStorageService;
use Illuminate\Http\JsonResponse;

class EmployeeController extends Controller
{
    public function __construct(
        private readonly EmployeeStorageService $storage
    ) {}

    /**
     * GET /api/v1/employees
     * Return all stored employee profiles.
     */
    public function index(): JsonResponse
    {
        $employees = $this->storage->all();

        return response()->json([
            'success' => true,
            'data'    => array_map(
                fn ($emp) => (new EmployeeResource($emp))->toArray(request()),
                $employees
            ),
            'total'   => count($employees),
        ]);
    }

    /**
     * POST /api/v1/employees
     * Validate, persist, and return the new employee record.
     */
    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        // $request->validated() contains only the whitelisted, validated fields.
        $employee = $this->storage->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Employee created successfully.',
            'data'    => (new EmployeeResource($employee))->toArray($request),
        ], 201);
    }
}