import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarById } from '@/actions/webinar'
import React from 'react'
import RenderWebinar from './_components/RenderWebinar'
import { WebinarWithPresenter } from '@/lib/type'
import { WebinarStatusEnum } from '@prisma/client'
import { Metadata } from 'next'
import { createMetadata } from '@/seo/metadata'

const meta = {
  title: 'Live Stream',
  description: 'Nexora AI is an AI-powered tool to help boost your business.',
}

export const metadata: Metadata = createMetadata(meta)

type Props = {
  params: Promise<{
    liveWebinarId: string
  }>
  searchParams: Promise<{
    error: string
  }>
}

const page = async ({ params, searchParams }: Props) => {
  const { liveWebinarId } = await params
  const { error } = await searchParams
  const webinarData = await getWebinarById(liveWebinarId)
  // let recording = null //premium
  // const recording = {} 

  if (webinarData?.webinarStatus === WebinarStatusEnum.ENDED) {
    // recording = await getStreamRecording(liveWebinarId) //premium
  }

  if (!webinarData) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center text-lg sm:text-4xl'>
        Webinar not found
      </div>
    )
  }

  const checkUser = await onAuthenticateUser()
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string
  const token = process.env.STREAM_TOKEN as string
  const callId = process.env.STREAM_CALL_ID as string

  return <div className='w-full min-h-screen max-auto'>
    <RenderWebinar
        error={error}
        user={checkUser.user || null}
        webinar={webinarData as WebinarWithPresenter}
        apiKey={apiKey}
        // recording={recording?.data || null} // Premium feature
        recording={null}
    />
  </div>
}

export default page
