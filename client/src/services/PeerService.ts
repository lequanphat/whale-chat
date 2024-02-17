class PeerService {
  private peer: RTCPeerConnection;

  constructor() {
    const iceServers: RTCIceServer[] = [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
      },
    ];

    this.peer = new RTCPeerConnection({ iceServers });
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const ans: RTCSessionDescriptionInit = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    } else {
      throw new Error('RTCPeerConnection not initialized.');
    }
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    } else {
      throw new Error('RTCPeerConnection not initialized.');
    }
  }

  async getOffer(): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      const offer: RTCSessionDescriptionInit = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    } else {
      throw new Error('RTCPeerConnection not initialized.');
    }
  }
}

export default new PeerService();
