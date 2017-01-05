<?php

namespace AlegreBill\Events;

use AlegreBill\Models\Bank;
use Illuminate\Http\UploadedFile;

class BankStoredEvent
{

    private $bank;

    private $logo;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Bank $bank, UploadedFile $logo = null)
    {

        $this->bank = $bank;
        $this->logo = $logo;
    }

    /**
     * @return Bank
     */
    public function getBank()
    {
        return $this->bank;
    }

    /**
     * @return UploadedFile
     */
    public function getLogo()
    {
        return $this->logo;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
