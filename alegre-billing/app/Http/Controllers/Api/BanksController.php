<?php

namespace AlegreBill\Http\Controllers\Api;


use AlegreBill\Http\Controllers\Controller;
use AlegreBill\Http\Controllers\Response;
use AlegreBill\Http\Requests;


class BanksController extends Controller
{

    /**
     * @var BankRepository
     */
    protected $repository;
    public function __construct(BankRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->repository->all();
    }
}
