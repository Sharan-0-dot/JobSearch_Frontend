import { useState, useEffect } from 'react'
import Input from '../shared/Input'
import SkillsInput from './SkillsInput'
import SalaryRangeInput from './SalaryRangeInput'
import Button from '../shared/Button'

const emptyForm = {
  name: '',
  email: '',
  skills: [],
  experienceYears: '',
  currentRole: '',
  preferredRoles: [],
  preferredLocations: [],
  preferredRemote: false,
  salaryMin: undefined,
  salaryMax: undefined,
}

export default function ProfileForm({ initialProfile, onSave, saving }) {
  const [form, setForm] = useState(emptyForm)
  const [touched, setTouched] = useState(new Set())

  useEffect(() => {
    if (initialProfile) {
      setForm({
        name: initialProfile.name || '',
        email: initialProfile.email || '',
        skills: initialProfile.skills || [],
        experienceYears: initialProfile.experienceYears ?? '',
        currentRole: initialProfile.currentRole || '',
        preferredRoles: initialProfile.preferredRoles || [],
        preferredLocations: initialProfile.preferredLocations || [],
        preferredRemote: initialProfile.preferredRemote || false,
        salaryMin: initialProfile.salaryMin ?? undefined,
        salaryMax: initialProfile.salaryMax ?? undefined,
      })
      setTouched(new Set())
    }
  }, [initialProfile])

  const markTouched = (field) => setTouched((prev) => new Set(prev).add(field))

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    markTouched(field)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {}
    for (const field of touched) {
      let value = form[field]
      if (field === 'experienceYears') {
        value = value === '' ? undefined : Number(value)
      }
      if (value !== undefined) body[field] = value
    }

    if (Object.keys(body).length === 0) return
    onSave(body)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Current role"
          value={form.currentRole}
          onChange={(e) => updateField('currentRole', e.target.value)}
          placeholder="e.g. Backend Engineer Intern"
        />
        <Input
          label="Years of experience"
          type="number"
          min="0"
          value={form.experienceYears}
          onChange={(e) => updateField('experienceYears', e.target.value)}
          placeholder="0"
        />
      </div>

      <SkillsInput
        label="Skills"
        values={form.skills}
        onChange={(v) => updateField('skills', v)}
        placeholder="Add a skill and press Enter"
      />

      <SkillsInput
        label="Preferred roles"
        values={form.preferredRoles}
        onChange={(v) => updateField('preferredRoles', v)}
        placeholder="e.g. Backend, DevOps"
      />

      <SkillsInput
        label="Preferred locations"
        values={form.preferredLocations}
        onChange={(v) => updateField('preferredLocations', v)}
        placeholder="e.g. Bangalore, Remote"
      />

      <label className="flex items-center gap-2 font-body text-body text-ink">
        <input
          type="checkbox"
          checked={form.preferredRemote}
          onChange={(e) => updateField('preferredRemote', e.target.checked)}
          className="accent-accent w-4 h-4"
        />
        Open to remote roles
      </label>

      <SalaryRangeInput
        min={form.salaryMin}
        max={form.salaryMax}
        onMinChange={(v) => updateField('salaryMin', v)}
        onMaxChange={(v) => updateField('salaryMax', v)}
      />

      <Button type="submit" disabled={saving || touched.size === 0} className="self-start">
        {saving ? 'Saving…' : 'Save profile'}
      </Button>
    </form>
  )
}