<?php

namespace AlegreBill\Repositories;

use AlegreBill\Events\BankStoredEvent;
use Illuminate\Http\UploadedFile;
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
    public function create(array $attributes)
    {
        $logo = $attributes['logo'];
        $attributes['logo'] = env('BANK_LOGO_DEFAULT');
        $model =  parent::create($attributes); // TODO: Change the autogenerated stub
        $event = new BankStoredEvent($model, $logo);
        event($event);
        return $model;
    }

    public function update(array $attributes, $id)
    {
        $logo = null;
        if(isset($attributes['logo']) && $attributes['logo'] instanceof UploadedFile){
            $logo = $attributes['logo'];
            unset($attributes['logo']);
        }
        $model =  parent::update($attributes, $id);
        $event = new BankStoredEvent($model, $logo);
        event($event);
        return $model; // TODO: Change the autogenerated stub
    }


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
