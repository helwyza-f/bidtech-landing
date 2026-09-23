<?php

namespace App\Mail;

use App\Models\Order;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentSuccessAndAccountMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;
    public ?User $user;
    public string $defaultPassword;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order, ?User $user = null, string $defaultPassword = 'Password123!')
    {
        $this->order = $order->loadMissing('template');
        $this->user = $user;
        $this->defaultPassword = $defaultPassword;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address', 'billing@bidtech.co.id'),
                config('mail.from.name', 'Bidtech')
            ),
            subject: "[Pembayaran Berhasil] Invoice Lunas & Kredensial Akun Proyek #{$this->order->order_number} - Bidtech",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.payment_success_account',
            with: [
                'order'           => $this->order,
                'user'            => $this->user,
                'template'        => $this->order->template,
                'defaultPassword' => $this->defaultPassword,
                'dashboardUrl'    => route('login'),
                'bayarUrl'        => route('checkout.bayar', [
                    'template'    => $this->order->template_id,
                    'order'       => $this->order->order_number,
                ]),
                'pdfUrl'          => route('checkout.invoice.download', $this->order),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
