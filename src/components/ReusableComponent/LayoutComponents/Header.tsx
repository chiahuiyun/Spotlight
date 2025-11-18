'use client'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { ArrowLeft, Zap } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import PurpleIcon from '../PurpleIcon'
import CreateWebinarButton from '../CreateWebinarButton'
import Stripe from 'stripe'
import SubscriptionModal from '../SubscriptionModal'
import { StripeElements } from './Element'
import { Assistant } from '@vapi-ai/server-sdk/api'

type Props = {
  user: User
  stripeProducts: Stripe.Product[] | []
  assistants: Assistant[] | []
}

//TODO: Stripe Subscription, Assistant,
const Header = ({ user, stripeProducts, assistants }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background'>
      {pathname.includes('pipeline') ? (
        <Button
          className='bg-primary/10 border border-border rounded-xl'
          variant={'outline'}
          onClick={() => router.push('/webinars')}
        >
          <ArrowLeft /> Back to Webinars
        </Button>
      ) : (
        <div className='px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize'>
          {pathname.split('/')[1]}
        </div>
      )}
      {/* TODO: build stripe subscription and create webinar button */}
      <div className='flex gap-6 items-center flex-wrap'>
        <PurpleIcon>
          {/* <LightningIcon /> */}
          <Zap />
        </PurpleIcon>
        {/* TODO: build stripe subscription and create webinar button */}
        {user.subscription ? (
          <CreateWebinarButton
            stripeProducts={stripeProducts}
            assistants={assistants}
          />
        ) : (
          <StripeElements>
            <SubscriptionModal user={user} />
          </StripeElements>
        )}
      </div>
    </div>
  )
}

export default Header
