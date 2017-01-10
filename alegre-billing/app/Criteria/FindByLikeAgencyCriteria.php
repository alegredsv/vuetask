<?php

namespace AlegreBill\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class FindByLikeAgencyCriteria
 * @package namespace AlegreBill\Criteria;
 */
class FindByLikeAgencyCriteria implements CriteriaInterface
{

    /**
     * @var
     */
    private $agency;

    public function __construct($agency)
    {
        $this->agency = $agency;
    }
    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $queryBuilder =  $model->where('agency','LIKE', "%{$this->agency}%");
        return $queryBuilder;
    }
}
