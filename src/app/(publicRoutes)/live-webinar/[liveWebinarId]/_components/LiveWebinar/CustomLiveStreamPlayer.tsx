'use client'

import { WebinarWithPresenter } from '@/lib/type'
import {
  useStreamVideoClient,
  Call,
  StreamCall,
} from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import LiveWebinarView from '../Common/LiveWebinarView'

type Props = {
  username: string
  callId: string
  callType: string
  webinar: WebinarWithPresenter
  token: string
}

const CustomLiveStreamPlayer = ({
  username,
  callId,
  callType,
  webinar,
  token,
}: Props) => {
  const client = useStreamVideoClient()
  const [call, setCall] = useState<Call>()
  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    if (!client) return
    const myCall = client.call(callType, callId)
    setCall(myCall)
    myCall.join({ create: true }).then(
      () => setCall(myCall),
      () => console.error('Failed to join the call')
    )

    return () => {
      // myCall.leave().catch((e) => {
      //   console.error('Failed to join the call', e)
      // })
      setCall(undefined)
    }
  }, [client, callId, callType])

  if (!call) return null

  return (
    <StreamCall call={call}>
      <LiveWebinarView
        showChat={showChat}
        setShowChat={setShowChat}
        webinar={webinar}
        isHost={true}
        username={username}
        userId={webinar.presenter.id}
        userToken={token}
        call={call}
      />
    </StreamCall>
  )
}

export default CustomLiveStreamPlayer
