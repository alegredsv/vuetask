<?php

namespace AlegreBill\Presenters;

use AlegreBill\Transformers\BankAccountTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class BankAccountPresenter
 *
 * @package namespace AlegreBill\Presenters;
 */
class BankAccountPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new BankAccountTransformer();
    }
}
