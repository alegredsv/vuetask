<?php

namespace AlegreBill\Listeners;

use AlegreBill\Events\BankCreatedEvent;
use AlegreBill\Events\BankStoredEvent;
use AlegreBill\Models\Bank;
use AlegreBill\Repositories\BankRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class BankLogoUpload
{
    /**
     * @var BankRepository
     */
    private $repository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(BankRepository $repository)
    {
        //
        $this->repository = $repository;
    }

    /**
     * Handle the event.
     *
     * @param  BankCreatedEvent  $event
     * @return void
     */
    public function handle(BankStoredEvent $event)
    {
        $bank = $event->getBank();
        $logo = $event->getLogo();
        $name = md5(time()) . '.' .$logo->guessExtension();
        $destFile = Bank::logosDir();
        \Storage::disk('public')->putFileAs($destFile,$logo,$name);
        $this->repository->update(['logo' => $name, 'id'=> $bank->id]);
    }
}
