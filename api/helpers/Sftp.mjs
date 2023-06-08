import Client from 'ssh2-sftp-client'
import SFTP_CONFIG from '../../config/SFTP_CONFIG.mjs'

class Sftp {
  constructor () {
    this.client = new Client()
    this.connect = this.connect.bind(this)
  }

  async connect (config = {}) {
    try {
      await this.client.connect({ ...SFTP_CONFIG, ...config })
      console.log('[Sftp] Client Connected.')
    } catch (err) {
      console.log('[Sftp] Connect err', err)
      throw err
    }
  }

  async disconnect () {
    await this.client.end()
    console.log('[Sftp] Client Disconnected.')
  }

  async fileExists (path = '') {
    try {
      const response = await this.client.exists(path)
      return response === '-'
    } catch (err) {
      console.log('[Sftp] FileExists err', err)
      return false
    }
  }

  async getFileBuffer (path = '') {
    const buffer = await this.client.get(path)
    return buffer
  }

  async chmod (path = '', newMode = '') {
    await this.client.chmod(path, newMode)
  }
}

export default Sftp
