<?php

namespace AlegreBill\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use AlegreBill\Repositories\BankRepository;
use AlegreBill\Models\Bank;
use AlegreBill\Validators\BankValidator;

/**
 * Class BankRepositoryEloquent
 * @package namespace AlegreBill\Repositories;
 */
class BankRepositoryEloquent extends BaseRepository implements BankRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Bank::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
