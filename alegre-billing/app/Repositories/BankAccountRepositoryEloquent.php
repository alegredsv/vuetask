<?php

namespace AlegreBill\Repositories;

use AlegreBill\Presenters\BankAccountPresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use AlegreBill\Repositories\BankAccountRepository;
use AlegreBill\Models\BankAccount;


/**
 * Class BankAccountRepositoryEloquent
 * @package namespace AlegreBill\Repositories;
 */
class BankAccountRepositoryEloquent extends BaseRepository implements BankAccountRepository
{
    protected $fieldSearchable =[
        'name',
        'agency',
        'bank.name'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return BankAccount::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return BankAccountPresenter::class;
    }
}
