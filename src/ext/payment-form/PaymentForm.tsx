"use client";

import InputError from "@/src/components/custom/input-error/InputError";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentForm({ onSuccess, onClose }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/cart",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Erro ao processar o pagamento");
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
      onClose();
    }

    setLoading(false);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed w-screen h-screen left-0 top-0 bg-[#ccc]/10 backdrop-blur-xs z-[1100]"
      ></div>

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-xl z-[1200]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-button font-semibold">Finalizar Pagamento</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <HiXMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PaymentElement />

          <div className="mt-2">
            <PrimaryButton
              type="submit"
              title={loading ? "Processando..." : "Pagar"}
              disabled={!stripe || loading}
            />
          </div>
          {errorMessage && <InputError message={errorMessage} />}
        </form>
      </div>
    </>
  );
}
