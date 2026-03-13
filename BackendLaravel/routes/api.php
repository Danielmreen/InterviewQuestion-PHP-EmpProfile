<?php

use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('employees', [EmployeeController::class, 'store']);
    Route::get('employees',  [EmployeeController::class, 'index']);
});